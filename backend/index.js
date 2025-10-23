import cors from "cors";
import "dotenv/config";
import express from "express";
import session from "express-session";
import { supabase } from "./supabase.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

function requireLogin(req, res, next) {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      throw error;
    }
    const id = data.user.id;
    console.log("Id",id)
    req.session.user = { id };
    const { data:user, error:error2 } = await supabase
      .from("Users")
      .select("*")
      .eq("id", id)
      .single();
    console.log("User:",user)
    res.json({ success: true,user:user});
  } catch (error) {
    console.error(error);
    res.json({ message: "Login failed", success: false });
  }
});

app.get("/api/users",async(req,res)=>{
  const { data, error: error2 } = await supabase
    .from("Users")
    .select("*")
  res.json({users:data})
})

app.post("/api/signup", async (req, res) => {
    console.log("Signup")
  try {
    const { username, email, password } = req.body;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      throw error;
    }
    const id = data.user.id;
    const { error: dbError } = await supabase
      .from("Users")
      .insert({ id: id, name: username });
    if (dbError) {
      throw dbError;
    }
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.json({ message: "Signup failed", success: false });
  }
});

app.post("/api/logout",async(req,res)=>{
  try {
    const {error} = await supabase.auth.signOut()
    if (error) {
      throw error
    }
    res.json({success:true})
  } catch (error) {
    console.error(error)
    res.json({success:false})
  }
})

app.get("/api/gettransactionhistory", requireLogin, async (req, res) => {
  try {
    const userId = req.session.user.id;
    console.log(userId);
    const { data, error } = await supabase
      .from("Transaction_History")
      .select(["id", "price", "created_at"])
      .eq("user_id", userId);
    if (error) {
      throw error;
    }
    res.json({ success: true, transactions: data });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Fetching transactions failed" });
  }
});

app.get(
  "/api/gettransaction/:transactionid",
  requireLogin,
  async (req, res) => {
    try {
      const userId = req.user.id;
      const transactionId = req.params.transactionid;
      const { data: transactionItemsId, error: transactionItemsIdError } =
        await supabase
          .from("Transaction_Items")
          .select("item_id")
          .eq("transaction_id", transactionId);
      if (transactionItemsIdError) {
        throw transactionItemsIdError;
      }
      const { data: itemList, error: itemListError } = await supabase
        .from("Items")
        .select("*")
        .in("id", transactionItemsId);
      if (itemListError) {
        throw itemListError;
      }
      res.json({ success: true, transactions: itemList });
    } catch (error) {
      console.error(error);
      res.json({ success: false, message: "Fetching transactions failed" });
    }
  }
);

app.get("/api/getitems", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("Items")
      .select("name, price, available, description");
    if (error) {
      throw error;
    }
    res.json({ items: data, success: true });
  } catch (q) {
    res.json({ success: false, message: "Items not found" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
