export interface LumberFuturePrice{
    rec_id?: number;
    i_desc?: string;
    month_price?: number;
    future_price?: number;
    val3?: number;
    userid?: string;
}

export interface PricesResult {
    anticipatedPrices: LumberFuturePrice[];
    months: LumberFuturePrice[];
  }