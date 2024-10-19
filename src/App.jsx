import { useState } from "react";
import background from "./assets/images/background.jpg";
import InputBox from "./components/inputBox";
import useCurrencyInfo from "./hooks/currencyInfo";
function App() {
  const [amount, setAmount] = useState(0);
  const [to, setTo] = useState("inr");
  const [from, setFrom] = useState("usd");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  };

  const swap = () => {
    setFrom(to);
    setTo(from);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
    console.log(convertedAmount);
    console.log(amount);
  };

  // const converCurrency = () => {};

  return (
    <div className="w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          convert();
        }}
      >
        <div
          className="min-h-screen w-full flex justify-center items-center flex-col "
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: "cover",
          }}
        >
          <div className="w-full flex justify-center items-center flex-col gap-2 ">
            <div className=" flex justify-center items-center flex-col gap-2 bg-white/30 backdrop-blur-sm p-9">
              <div className=" w-full flex justify-center">
                <InputBox
                  label="From"
                  amount={amount}
                  onAmountChange={(e) => setAmount(e)}
                  onCurrencyChange={(e) => setTo(e)}
                  currencyOptions={options}
                  selectedCurrency={from}
                  className=" mb-2"
                ></InputBox>
              </div>
              <button
                onClick={swap}
                className="absolute p-2 rounded-lg  bg-blue-400"
              >
                SWAP
              </button>
              <div className="flex justify-center w-full">
                <InputBox
                  label="To"
                  amount={convertedAmount}
                  onCurrencyChange={(e) => setTo(e)}
                  currencyOptions={options}
                  selectedCurrency={to}
                  amountDisabled={false}
                  className=" mt-2"
                ></InputBox>
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-500 px-5 py-2 rounded-lg text-white mt-3"
            >
              Convert
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
