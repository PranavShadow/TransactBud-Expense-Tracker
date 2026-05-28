"use client"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
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
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import EmojiPicker from 'emoji-picker-react'
import { db } from '@/utils/dbConfig'
import { Budgets } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { toast } from 'sonner'

function CreateBudget() {
    
    const [emojiIcon, setEmojiIcon] = useState('🦜');
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

    const [name, setName] = useState();
    const [amount, setAmount] = useState();

    const {user} = useUser();

    //Used to create budget

    const onCreateBudget=async()=>{
        const result = await db.insert(Budgets)
        .values({
            name:name,
            amount: amount,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            icon: emojiIcon
        }).returning({insertedId:Budgets.id})

        if(result){
            toast("Budget has been created", { position: "bottom-right" })
        }
        }
    
  return (
    <div>
      <Dialog>
      <form>
        <DialogTrigger asChild>
            <div className='bg-slate-100 p-10 rounded-md items-center flex flex-col cursor-pointer hover:shadow-md border-2 border-dashed '>
            <h2 className='text-3xl'>+</h2>
            <h2>Create New Budget</h2>
        </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Create New Budget</DialogTitle>
            <DialogDescription>
               <div className='mt-5'>
                 <Button variant='outline'
                  size='lg'
                  className='text-lg'
                  onClick={()=> setOpenEmojiPicker(!openEmojiPicker)}
                  >
                    {emojiIcon}
                </Button>
                <div className='absolute'>
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
              onChange={(e) => setName(e.target.value)} />
            </Field>
            <Field>
              <Label htmlFor="username-1">Budget Amount</Label>
              <Input id="username-1" type="number" name="username" placeholder="e.g. 7000Rs"
              onChange={(e) => setAmount(e.target.value)} />
            </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <DialogClose asChild>
            <Button disabled={!(name&&amount)}
            onClick={()=> onCreateBudget()}
            >Create Budget</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
    </div>
  )
}

export default CreateBudget