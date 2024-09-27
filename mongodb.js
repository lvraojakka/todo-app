db.sales.aggregate([
    { 
        $unwind: "$items" 
    },
    {
        $group: {
            _id: {
                store: "$store",
                month: { $dateToString: { format: "%Y-%m", date: "$date" } }
            },
            totalRevenue: { 
                $sum: { 
                    $multiply: ["$items.quantity", "$items.price"] 
                } 
            },
            totalQuantity: { 
                $sum: "$items.quantity" 
            },
            totalPrice: { 
                $sum: { 
                    $multiply: ["$items.quantity", "$items.price"] 
                }
            }
        }
    },
    {
        $project: {
            _id: 0,
            store: "$_id.store",
            month: "$_id.month",
            totalRevenue: 1,
            averagePrice: { 
                $cond: { 
                    if: { $gt: ["$totalQuantity", 0] }, 
                    then: { $divide: ["$totalPrice", "$totalQuantity"] }, 
                    else: 0 
                } 
            }
        }
    },
    {
        $sort: {
            store: 1,
            month: 1
        }
    }
]);
