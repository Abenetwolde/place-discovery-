"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, DollarSign, TrendingUp, CircleArrowUp, CloudSunRain } from "lucide-react"
import TravelTips from "./travel-tip"

function WeatherCard() {
  return (
    <div className="relative flex  shadow-1xl  flex-col rounded-2xl bg-opacity-10 bg-gradient-to-r from-gray-200 to-gray-300 bg-clip-padding p-4 backdrop-blur-sm backdrop-filter dark:from-gray-700 dark:to-gray-900">
      <div className="flex flex-1 flex-col gap-2 dark:text-white">
        <p className="city opacity-70">Addis Ababa</p>
        <div className="flex items-center">
          <CloudSunRain className="h-30 w-full " />
          <p className="text-5xl font-black">19&deg;</p>
        </div>
        <p className="feels-like opacity-70">Feels like 21&deg;</p>
      </div>
      <div className="flex justify-between rounded-xl bg-gray-400 bg-opacity-30 bg-clip-padding py-1 backdrop-blur-lg backdrop-filter">
        <div className="flex items-center gap-1 px-2 text-orange-500 dark:text-orange-200">
          <CircleArrowUp className="h-8 w-5" />
          24&deg;
        </div>
        <p className="text-black opacity-50">|</p>
        <div className="flex items-center gap-1 px-3 text-green-800 dark:text-green-200">
          <CircleArrowUp className="h-5 w-5 rotate-180" />
          9&deg;
        </div>
      </div>
    </div>
  );
}

interface Currency {
  code: string;
  name: string;
  symbol: string;
}

interface ExchangeRates {
  [key: string]: number;
}

function CurrencyConverter() {
  const [amount, setAmount] = useState<string>("100");
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("ETB");
  const [rates, setRates] = useState<ExchangeRates>({});
  const [result, setResult] = useState<number | null>(null);

  // Mock exchange rates (in production, use a real API)
  const mockRates: ExchangeRates = {
    USD: 1,
    ETB: 55.2, // Ethiopian Birr
    EUR: 0.85,
    GBP: 0.73,
    CAD: 1.25,
    AUD: 1.35,
  };

  const currencies: Currency[] = [
    { code: "USD", name: "US Dollar", symbol: "$" },
    { code: "ETB", name: "Ethiopian Birr", symbol: "Br" },
    { code: "EUR", name: "Euro", symbol: "€" },
    { code: "GBP", name: "British Pound", symbol: "£" },
    { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
    { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  ];

  useEffect(() => {
    setRates(mockRates);
  }, []);

  useEffect(() => {
    if (amount && rates[fromCurrency] && rates[toCurrency]) {
      const fromRate: number = rates[fromCurrency];
      const toRate: number = rates[toCurrency];
      const converted: number = (Number.parseFloat(amount) / fromRate) * toRate;
      setResult(converted);
    }
  }, [amount, fromCurrency, toCurrency, rates]);

  const swapCurrencies = (): void => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const getCommonAmounts = (): { original: number; converted: number }[] => {
    const common: number[] = [10, 50, 100, 500, 1000];
    return common.map((amt: number) => {
      const converted: number = (amt / rates[fromCurrency]) * rates[toCurrency];
      return { original: amt, converted };
    });
  };

  return (
    <div className="max-w-md mx-auto bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl p-6 transition-all duration-300 hover:shadow-3xl">
      <div className="flex items-center space-x-2 mb-6">
        <DollarSign className="h-6 w-6 text-indigo-600" />
        <h2 className="text-xl font-bold text-gray-800">Currency Converter</h2>
      </div>

      <div className="space-y-6">
        {/* Input and From Currency */}
        <div className="flex items-center space-x-3">
          <input
            type="number"
            value={amount}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="flex-1 p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-800 transition-all duration-200"
          />
          <select
            value={fromCurrency}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFromCurrency(e.target.value)}
            className="p-3 rounded-lg border border-gray-200 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-24 transition-all duration-200"
          >
            {currencies.map((currency: Currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.code}
              </option>
            ))}
          </select>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <button
            onClick={swapCurrencies}
            className="p-2 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition-all duration-200 transform hover:scale-110"
          >
            <ArrowUpDown className="h-5 w-5" />
          </button>
        </div>

        {/* Output and To Currency */}
        <div className="flex items-center space-x-3">
          <input
            type="text"
            value={result ? result.toFixed(2) : ""}
            readOnly
            placeholder="Converted amount"
            className="flex-1 p-3 rounded-lg border border-gray-200 bg-gray-100 text-gray-800 focus:outline-none"
          />
          <select
            value={toCurrency}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setToCurrency(e.target.value)}
            className="p-3 rounded-lg border border-gray-200 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-24 transition-all duration-200"
          >
            {currencies.map((currency: Currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.code}
              </option>
            ))}
          </select>
        </div>

        {/* Quick Reference */}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center text-sm text-gray-600 mb-3">
            <TrendingUp className="h-4 w-4 mr-2 text-indigo-600" />
            <span>Quick Reference</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-sm">
            {getCommonAmounts()
              .slice(0, 3)
              .map((item: { original: number; converted: number }, index: number) => (
                <div
                  key={index}
                  className="flex justify-between p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200"
                >
                  <span>
                    {currencies.find((c: Currency) => c.code === fromCurrency)?.symbol}
                    {item.original}
                  </span>
                  <span className="text-indigo-600 font-medium">
                    {currencies.find((c: Currency) => c.code === toCurrency)?.symbol}
                    {item.converted.toFixed(2)}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
    }

export default function WeatherCurrencyRow() {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col lg:flex-row gap-4 mt-20">
        <div className="w-full lg:w-1/3">
          <WeatherCard />
        </div>
        <div className="w-full lg:w-1/3">
          <CurrencyConverter />
        </div>
        <div className="w-full lg:w-1/3">
       <TravelTips/>
        </div>
      </div>
    </div>
  );
}