import express from 'express';
import { supabase } from "./supabase.js";

const app = express();
const port = 3000;

app.use(express.json())

app.get('/api/gettransactionhistory',async (req, res) => {
    try {
        const userId = req.user.id
        console.log(userId)
        const {data,error} = await supabase.from("Transaction_History").select(["id","price","created_at"]).eq("user_id",userId)
        if (error) {
            throw error
        }
        res.json({success:true,transactions:data})
    } catch (error) {
        console.error(error)
        res.json({success:false,message:"Fetching transactions failed"})
    }
});

app.get('/api/gettransaction/:transactionid',async (req, res) => {
    try {
        const userId = req.user.id
        const transactionId = req.params.transactionid
        const {data:transactionItemsId,error:transactionItemsIdError} = await supabase.from("Transaction_Items").select("item_id").eq("transaction_id",transactionId)
        if (transactionItemsIdError) {
            throw transactionItemsIdError
        }
        const {data:itemList,error:itemListError} = await supabase.from("Items").select("*").in("id",transactionItemsId)
        if (itemListError) {
            throw itemListError
        }
        res.json({success:true,transactions:itemList})
    } catch (error) {
        console.error(error)
        res.json({success:false,message:"Fetching transactions failed"})
    }
});

app.get('/api/getitems',async (req, res) =>{
    try {
        const {data,error} = await supabase.from("Items").select("name, price, available, description")
        if (error) {
            throw error
        }
        res.json({items:data,success:true})
    } catch (q) {
        res.json({success:false,message:"Items not found"})        
    }
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});