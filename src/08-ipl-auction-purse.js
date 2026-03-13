/**
 * 🏏 IPL Auction Purse Manager
 *
 * IPL mega auction chal rahi hai! Team ka total purse (budget) diya hai
 * aur players ki list di hai jinhe khareedna hai. Tujhe calculate karna
 * hai ki team ne kitna spend kiya, kitna bacha, aur kuch stats banana hai.
 *
 * Rules:
 *   - team object: { name: "CSK", purse: 9000 } (purse in lakhs)
 *   - players array: [{ name: "Dhoni", role: "wk", price: 1200 }, ...]
 *   - role can be: "bat", "bowl", "ar" (all-rounder), "wk" (wicketkeeper)
 *   - Calculate:
 *     - totalSpent: sum of all player prices (use reduce)
 *     - remaining: purse - totalSpent
 *     - playerCount: total players bought
 *     - costliestPlayer: player object with highest price
 *     - cheapestPlayer: player object with lowest price
 *     - averagePrice: Math.round(totalSpent / playerCount)
 *     - byRole: object counting players per role using reduce
 *       e.g., { bat: 3, bowl: 4, ar: 2, wk: 1 }
 *     - isOverBudget: boolean, true agar totalSpent > purse
 *   - Hint: Use reduce(), filter(), sort(), find(), every(), some(),
 *     Array.isArray(), Math.round(), spread operator
 *
 * Validation:
 *   - Agar team object nahi hai ya team.purse positive number nahi hai, return null
 *   - Agar players array nahi hai ya empty hai, return null
 *
 * @param {{ name: string, purse: number }} team - Team info with budget
 * @param {Array<{ name: string, role: string, price: number }>} players
 * @returns {{ teamName: string, totalSpent: number, remaining: number, playerCount: number, costliestPlayer: object, cheapestPlayer: object, averagePrice: number, byRole: object, isOverBudget: boolean } | null}
 *
 * @example
 *   iplAuctionSummary(
 *     { name: "CSK", purse: 9000 },
 *     [{ name: "Dhoni", role: "wk", price: 1200 }, { name: "Jadeja", role: "ar", price: 1600 }]
 *   )
 *   // => { teamName: "CSK", totalSpent: 2800, remaining: 6200, playerCount: 2,
 *   //      costliestPlayer: { name: "Jadeja", role: "ar", price: 1600 },
 *   //      cheapestPlayer: { name: "Dhoni", role: "wk", price: 1200 },
 *   //      averagePrice: 1400, byRole: { wk: 1, ar: 1 }, isOverBudget: false }
 *
 *   iplAuctionSummary({ name: "RCB", purse: 500 }, [{ name: "Kohli", role: "bat", price: 1700 }])
 *   // => { ..., remaining: -1200, isOverBudget: true }
 */
export function iplAuctionSummary(team, players) {
  if (
    typeof team !== "object" ||
    team === null ||
    !Number.isFinite(team.purse) ||
    team.purse <= 0 ||
    !Array.isArray(players) ||
    players.length === 0
  ) return null;

  const summary = players.reduce(
    (acc, player) => {
      const { price, role } = player;

      acc.totalSpent += price;
      acc.playerCount++;

      if (!acc.costliestPlayer || price > acc.costliestPlayer.price) {
        acc.costliestPlayer = player;
      }

      if (!acc.cheapestPlayer || price < acc.cheapestPlayer.price) {
        acc.cheapestPlayer = player;
      }

      acc.byRole[role] = (acc.byRole[role] || 0) + 1;

      return acc;
    },
    {
      totalSpent: 0,
      playerCount: 0,
      costliestPlayer: null,
      cheapestPlayer: null,
      byRole: {}
    }
  );

  const remaining = team.purse - summary.totalSpent;

  return {
    teamName: team.name,
    totalSpent: summary.totalSpent,
    remaining,
    playerCount: summary.playerCount,
    costliestPlayer: summary.costliestPlayer,
    cheapestPlayer: summary.cheapestPlayer,
    averagePrice: Math.round(summary.totalSpent / summary.playerCount),
    byRole: summary.byRole,
    isOverBudget: summary.totalSpent > team.purse
  };
}