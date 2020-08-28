
export class FormatUtils {
  private static usdFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  static toUsdCurrency = (value: number): string =>
    FormatUtils.usdFormatter.format(value);
}
