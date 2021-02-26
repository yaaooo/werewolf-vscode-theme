# Buy and sell stock k times

from math import inf

def max_profit(k, prices):
    if not k or not prices:
        return 0

    n = len(prices)

    # (Optional) Additional optimisation if we
    # are able to execute unlimited transactions
    if k >= len(prices) * 2:
        max_profits = 0
        for i in range(1, n):
            max_profits += max(prices[i] - prices[i-1], 0)
        return max_profits

    # `profits[i]` tracks the best profits attainable when
    # we *add* the option of selling at `i`
    profits = [0 for _ in range(n)]

    for txn in range(k):

        # `new_profits` tracks the best profits attainable when
        # we *increment* the number of allowable transactions
        new_profits = profits[:]

        # best_preceding_value =
        # best profits before purchase - best_buy_price
        best_preceding_value = -prices[0]

        for sell_idx in range(1, n):

            # Evaluate selling price
            new_profits[sell_idx] = max(
                new_profits[sell_idx-1],
                best_preceding_value + prices[sell_idx]
            )

            # Update best_preceding_value
            best_preceding_value = max(
                best_preceding_value,
                profits[sell_idx-1] - prices[sell_idx]
            )

        profits = new_profits

    return profits[-1]


def buy_and_sell_stock_k_times(L, k):

    # Profits with i-1 transactions
    n = len(L)
    prev_profits = [0 for _ in range(n)]

    for _ in range(k):
        # Profits with i transactions
        profits = [0 for _ in range(n)]

        """
        For each txn we consider:

        sell_price - buy_price + prev_profits
        L[i]       - L[j]      + prev_profits[j-1]
        where 0 < j < i
 

        We either sell at i, or not.
        If we sell at i, we can consider the sell_price as "fixed".

        Given a fixed sell_price, we want to consider the best buy_price
        that we've seen so far combined with the best profits from
        transactions preceding that buy_price

        sell_price + best_buy_price_and_prev_profits
        L[i] + max(
            L[i-2] + prev_profits[i-3],
            L[i-3] + prev_profits[i-4],
            ...
        )
        """
        # Recall why -inf instead of 0?
        best_buy_price_and_prev_profits = -inf

        for i in range(1, n):
            best_buy_price_and_prev_profits = max(
                best_buy_price_and_prev_profits,
                - L[i-1] + (prev_profits[i-2] if i >= 2 else 0)
            )
            profits[i] = max(
                profits[i-1],
                L[i] + best_buy_price_and_prev_profits
            )

        prev_profits = profits

    return max(prev_profits)
