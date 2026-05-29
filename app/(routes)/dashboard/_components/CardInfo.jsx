import { PiggyBank, ReceiptText, Wallet } from 'lucide-react'
import React, { useEffect, useState } from 'react'

function CardInfo({budgetList}) {

    const [totalBudget, setTotalBudget] = useState(0);
    const [totalSpend, setTotalSpend] = useState(0);

    useEffect(() => {
        budgetList && calculateCardInfo();
    }, [budgetList])

    const calculateCardInfo = () => {
        let totalBudget_ = 0;
        let totalSpend_ = 0;
        budgetList.forEach(e => {
            totalBudget_ = totalBudget_ + Number(e.amount);
            totalSpend_ = totalSpend_ + e.totalSpend;
        });
        setTotalSpend(totalSpend_);
        setTotalBudget(totalBudget_);
    }

    return (
        <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {budgetList?.length>0 ?
            <>
                <div className='p-7 border rounded-lg flex items-center justify-between'>
                    <div>
                        <h2 className='text-sm'>Total Budget</h2>
                        <h2 className='font-bold text-2xl'>Rs. {totalBudget}</h2>
                    </div>
                    <PiggyBank className='bg-primary p-3 h-12 w-12 rounded-full text-white'/>
                </div>
                <div className='p-7 border rounded-lg flex items-center justify-between'>
                    <div>
                        <h2 className='text-sm'>Total Spend</h2>
                        <h2 className='font-bold text-2xl'>Rs. {totalSpend}</h2>
                    </div>
                    <ReceiptText className='bg-primary p-3 h-12 w-12 rounded-full text-white'/>
                </div>
                <div className='p-7 border rounded-lg flex items-center justify-between'>
                    <div>
                        <h2 className='text-sm'>No. of Budgets</h2>
                        <h2 className='font-bold text-2xl'>{budgetList?.length}</h2>
                    </div>
                    <Wallet className='bg-primary p-3 h-12 w-12 rounded-full text-white'/>
                </div>
            </>
            :
            [1,2,3].map((item, index) => (
                <div key={index} className='h-[110px] w-full bg-slate-200 animate-pulse rounded-lg'></div>
            ))
            }
        </div>
    )
}

export default CardInfo