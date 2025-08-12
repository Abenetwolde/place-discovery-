"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, DollarSign, TrendingUp, CircleArrowUp, CloudSunRain } from "lucide-react"

function WeatherCard() {
  return (
    <div className="relative flex  flex-col rounded-3xl bg-opacity-10 bg-gradient-to-r from-gray-200 to-gray-300 bg-clip-padding p-4 backdrop-blur-sm backdrop-filter dark:from-gray-700 dark:to-gray-900">
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



 function CurrencyConverter() {
  const [amount, setAmount] = useState("100")
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("ETB")
  const [rates, setRates] = useState<any>({})
  const [result, setResult] = useState<number | null>(null)

  const mockRates: any = {
    USD: 1,
    ETB: 55.2,
    EUR: 0.85,
    GBP: 0.73,
    CAD: 1.25,
    AUD: 1.35,
  }

  const currencies = [
    { code: "USD", name: "US Dollar", symbol: "$" },
    { code: "ETB", name: "Ethiopian Birr", symbol: "Br" },
    { code: "EUR", name: "Euro", symbol: "€" },
    { code: "GBP", name: "British Pound", symbol: "£" },
    { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
    { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  ]

  useEffect(() => {
    setRates(mockRates)
  }, [])

  useEffect(() => {
    if (amount && rates[fromCurrency] && rates[toCurrency]) {
      const fromRate = rates[fromCurrency]
      const toRate = rates[toCurrency]
      const converted = (Number.parseFloat(amount) / fromRate) * toRate
      setResult(converted)
    }
  }, [amount, fromCurrency, toCurrency, rates])

  const swapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  const getCommonAmounts = () => {
    const common = [10, 50, 100, 500, 1000]
    return common.map((amt) => {
      const converted = (amt / rates[fromCurrency]) * rates[toCurrency]
      return { original: amt, converted }
    })
  }

  return (
    <Card className="p-4 shadow-lg border border-gray-200 rounded-2xl bg-gradient-to-br from-white to-gray-50">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2 text-gray-800">
          <span className="bg-green-100 p-2 rounded-full">
            <DollarSign className="h-5 w-5 text-green-600" />
          </span>
          Currency Converter
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Amount & From Currency */}
        <div className="flex items-center gap-3">
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            className="flex-1 rounded-xl border-gray-300 focus:ring-2 focus:ring-green-400"
          />
          <Select value={fromCurrency} onValueChange={setFromCurrency}>
            <SelectTrigger className="w-24 rounded-xl border-gray-300 focus:ring-2 focus:ring-green-400">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((currency) => (
                <SelectItem key={currency.code} value={currency.code}>
                  {currency.code}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={swapCurrencies}
            className="hover:bg-green-100 rounded-full p-2"
          >
            <ArrowUpDown className="h-5 w-5 text-green-600" />
          </Button>
        </div>

        {/* Result & To Currency */}
        <div className="flex items-center gap-3">
          <Input
            type="text"
            value={result ? result.toFixed(2) : ""}
            readOnly
            placeholder="Converted amount"
            className="flex-1 rounded-xl bg-gray-100 border-gray-200 font-medium text-gray-800"
          />
          <Select value={toCurrency} onValueChange={setToCurrency}>
            <SelectTrigger className="w-24 rounded-xl border-gray-300 focus:ring-2 focus:ring-green-400">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((currency) => (
                <SelectItem key={currency.code} value={currency.code}>
                  {currency.code}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Quick Reference */}
        <div className="border-t pt-3 mt-3">
          <div className="text-xs text-gray-500 mb-2 flex items-center gap-1">
            <TrendingUp className="h-3 w-3 text-green-500" />
            Quick Reference
          </div>
          <div className="space-y-1">
            {getCommonAmounts()
              .slice(0, 3)
              .map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between text-xs bg-gray-50 px-3 py-2 rounded-lg shadow-sm"
                >
                  <span className="text-gray-600">
                    {currencies.find((c) => c.code === fromCurrency)?.symbol}
                    {item.original}
                  </span>
                  <span className="font-semibold text-gray-800">
                    {currencies.find((c) => c.code === toCurrency)?.symbol}
                    {item.converted.toFixed(2)}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


export default function WeatherCurrencyRow() {
  return (
    <div className="flex mt-20 flex-row gap-4">
      <div className="w-[30%]">
        <WeatherCard />
      </div>
      <div className="w-[70%]">
        <CurrencyConverter />
      </div>
    </div>
  );
}