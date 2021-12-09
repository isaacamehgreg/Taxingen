import dotenv from "dotenv";
dotenv.config();

const DOMAIN = process.env.NODE_ENV !== "production" ? "test" : "live";
export function generateReference(
  gateway:
    | "paystack"
    | "monnify"
    | "flutterwave"
    | "billing"
    | "transfer" = "paystack"
) {
  switch (gateway) {
    case "flutterwave":
      return (
        `swift|${DOMAIN}|flw` +
        Math.floor(Date.now() * Math.random()).toString()
      );

    case "monnify":
      return (
        `swift-|${DOMAIN}|mnf` +
        Math.floor(Date.now() * Math.random()).toString()
      );

    case "billing":
      return (
        `swift-|${DOMAIN}|bill` +
        Math.floor(Date.now() * Math.random()).toString()
      );

    case "transfer":
      return (
        `swift-|${DOMAIN}|tf` +
        Math.floor(Date.now() * Math.random()).toString()
      );

    default:
      return (
        `swift-${DOMAIN}-psk` +
        Math.floor(Date.now() * Math.random()).toString()
      );
  }
}
