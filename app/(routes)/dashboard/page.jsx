"use client"
import CardInfo from './_components/CardInfo';
import React, { useEffect, useState } from 'react'
import { db } from '@/utils/dbConfig'
import { Budgets, Expenses } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { eq, sql, getTableColumns, desc } from 'drizzle-orm'
import BarChartDashBoard from './_components/BarChartDashBoard';
import BudgetItem from './budgets/_components/BudgetItem';
import ExpenseListTable from './expenses/_components/ExpenseListTable';

function Dashboard() {
  const [budgetList, setBudgetList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);
  const {user} = useUser();

    useEffect(() => {
      user&&getBudgetList();
    }, [user])

  const getBudgetList=async()=>{
    const result = await db.select({
          ...getTableColumns(Budgets),
          totalSpend: sql`coalesce(sum(cast(${Expenses.amount} as numeric)), 0)`.mapWith(Number),
          totalItem: sql`count(${Expenses.id})`.mapWith(Number)
        }).from(Budgets)
          .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
          .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
          .groupBy(Budgets.id)
          .orderBy(desc(Budgets.id));
    
          setBudgetList(result);
          getAllExpenses();
  }

  //Used to get all expenses of a user
  const getAllExpenses=async()=>{
    const result = await db.select({
      id:Expenses.id,
      name:Expenses.name,
      amount:Expenses.amount,
      createdAt: Expenses.createdAt,
    }).from(Budgets)
    .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
    .where(eq(Budgets.createdBy, user?.primaryEmailAddress.emailAddress))
    .orderBy(desc(Expenses.id));
    setExpensesList(result)
  
  }
  return (
    <div className='p-8'>
      <h2 className='font-bold text-3xl '>Hi, {user?.fullName} 🤟</h2>
      <p className='text-gray-500'>Here is what hapenning with your money.</p>
      <CardInfo budgetList={budgetList}/>
      <div className='grid  grid-cols-1 md:grid-cols-3 mt-6 gap-5'>
        <div className='md:col-span-2'>
          <BarChartDashBoard budgetList={budgetList}/>
          <ExpenseListTable expensesList={expensesList}
          refreshData={()=>getBudgetList()}/>
        </div>
        <div className='grid gap-5'>
          <h2 className='font-bold text-lg'>Latest Budget</h2>
          {budgetList.map((budget, index) => (
            <BudgetItem budget={budget} key={index}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard