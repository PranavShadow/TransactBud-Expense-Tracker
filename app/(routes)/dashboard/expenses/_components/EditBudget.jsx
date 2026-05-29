"use client"
import { Button } from '@/components/ui/button'
import { PenBox } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import EmojiPicker from 'emoji-picker-react'
import { useUser } from '@clerk/nextjs'
import { Input } from '@/components/ui/input'
import { Field, FieldGroup } from '@/components/ui/field'
import { Label } from '@/components/ui/label'
import { eq } from 'drizzle-orm'
import { toast } from 'sonner'
import { db } from '@/utils/dbConfig'      
import { Budgets } from '@/utils/schema' 

function EditBudget({budgetInfo, refreshData}) {

    const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.icon);
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

    const [name, setName] = useState(budgetInfo?.name);
    const [amount, setAmount] = useState(budgetInfo?.amount);

    const {user} = useUser();

    useEffect(() => {
        if (budgetInfo) {
            setEmojiIcon(budgetInfo.icon);
            setName(budgetInfo.name);
            setAmount(budgetInfo.amount);
        }
    }, [budgetInfo])

    const onUpdateBudget=async()=>{
        const result = await db.update(Budgets).set({
            name: name,
            amount: amount,
            icon: emojiIcon,
        }).where(eq(Budgets.id, budgetInfo.id))
        .returning();
        
        if(result){
            refreshData();
            toast('Budget Updated')
        }
    }
  return (
    <div>

    <Dialog>
      <form>
        <DialogTrigger asChild>
        <Button className="flex gap-2"><PenBox/> Edit</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Update Existing Budget</DialogTitle>
            <DialogDescription>
               <div className='mt-5'>
                 <Button variant='outline'
                  size='lg'
                  className='text-lg'
                  onClick={()=> setOpenEmojiPicker(!openEmojiPicker)}
                  >
                    {emojiIcon}
                </Button>
                <div className='absolute z-10'>
                    <EmojiPicker 
                    open={openEmojiPicker}
                    onEmojiClick={(e) => {
                        setEmojiIcon(e.emoji)
                        setOpenEmojiPicker(false)
                    }}
                    />
                </div>
               </div>
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Budget Name</Label>
              <Input id="name-1" name="name" placeholder="e.g. Fuel Expenses"
              defaultValue={budgetInfo?.name} onChange={(e) => setName(e.target.value)} />
            </Field>
            <Field>
              <Label htmlFor="username-1">Budget Amount</Label>
              <Input id="username-1" type="number" name="username" placeholder="e.g. 7000Rs"
              defaultValue={budgetInfo?.amount}
              onChange={(e) => setAmount(e.target.value)}/>
            </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <DialogClose asChild>
            <Button disabled={!(name&&amount)}
            onClick={()=> onUpdateBudget()}
            >Update Budget</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
    </div>
  )
}

export default EditBudget