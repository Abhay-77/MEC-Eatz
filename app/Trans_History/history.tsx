import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator, // Added for loading state
  Alert, // Added for error handling
} from "react-native";

// Define a type/interface for clarity (recommended for real apps)
// type Transaction = {
//   id: string;
//   price: number; // Assuming this is the main value to display
//   date: string;
//   // 'amount' and 'type' are ignored based on the request
// };

// --- Transaction Item Component (Revised to show Date and Price only) ---
const TransactionItem = ({ price, date }: any) => {
  // Use a fixed color or logic if needed, but for simplicity, we'll use one color for the price
  const priceDisplay = `$${parseFloat(price).toFixed(2)}`;

  return (
    <TouchableOpacity style={styles.itemContainer}>
      <View style={styles.leftContent}>
        <Text style={styles.nameText}>Transaction Price</Text>
        <Text style={styles.dateText}>{date}</Text>
      </View>
      <View style={styles.rightContent}>
        <Text style={styles.priceText}>{priceDisplay}</Text>
      </View>
    </TouchableOpacity>
  );
};

// --- Main History Component ---
const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getTransactions() {
      try {
        const res = await fetch(
          "https://mec-eatz.onrender.com/api/gettransactionhistory"
          // "https://localhost:3000/api/gettransactionhistory"
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        if (!data.success) {
          // Assuming your API sends { success: false, message: '...' } on failure
          Alert.alert("Error", data.message || "Failed to fetch transactions.");
          return;
        }

        // --- Only keep date and price (and id) if necessary for the list ---
        const processedTransactions = data.transactions.map((t: any) => ({
          id: t.id, // Ensure id is present for keyExtractor
          date: t.created_at,
          price: t.price, // Assuming the price field holds the value
        }));

        setTransactions(processedTransactions);
      } catch (error) {
        console.error("Fetch error:", error);
        Alert.alert("Network Error", "Could not load transaction history.");
      } finally {
        setLoading(false);
      }
    }
    getTransactions();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ marginTop: 10 }}>Loading transactions...</Text>
      </View>
    );
  }

  if (transactions.length === 0) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text>No transaction history found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Transaction History</Text>
      <FlatList
        data={transactions}
        renderItem={({ item }) => (
          <TransactionItem
            // Only passing the two required fields
            price={item.price}
            date={item.date}
          />
        )}
        keyExtractor={(item: any) => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

// --- Stylesheet ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40, // Adjust for status bar/safe area
    backgroundColor: "#fff",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 15,
    alignItems: "center",
  },
  leftContent: {
    flex: 1,
  },
  rightContent: {
    marginLeft: 10,
    alignItems: "flex-end",
  },
  nameText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  dateText: {
    fontSize: 14,
    color: "#888",
    marginTop: 2,
  },
  priceText: {
    // New style for price field
    fontSize: 18,
    fontWeight: "bold",
    color: "#007AFF", // A neutral blue for price
  },
  separator: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginHorizontal: 15,
  },
});

export default TransactionHistory;
