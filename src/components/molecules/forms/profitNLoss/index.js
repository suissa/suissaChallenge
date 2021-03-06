import React, { useState } from 'react';
import Input from '../../../atoms/input/index'
import Button from '../../../atoms/button/index'

const formatMoney = (val) => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(val)

const calcInitialMargin = ({entry, quantity, leverage}) => (entry * quantity) / leverage
const calcROE = ({entry, exit, leverage}) => (((exit - entry) / entry) * 100) * leverage
const calcPNL = ({entry, exit, quantity, leverage}) => 
  (calcInitialMargin({entry, quantity, leverage}) * (calcROE({entry, exit, leverage}) / 100))



const ProfitNLoss = () => {

  const [leverage, setLeverage] = useState('')
  const [entry, setEntry] = useState('')
  const [exit, setExit] = useState('')
  const [quantity, setQuantity] = useState('')
  const [result, setResult] = useState('')
  
  const [initialMargin, setInitialMargin] = useState('')
  const [PNL, setPNL] = useState('')
  const [ROE, setROE] = useState('')

  const calculate = ({leverage, entry, exit, quantity}) => {
    // setResult(calcPNL({leverage, entry, exit, quantity}))
    console.log({leverage, entry, exit, quantity})
    console.log('calcInitialMargin: ', formatMoney(calcInitialMargin({entry, quantity, leverage})))
    console.log('calcPNL: ', formatMoney(calcPNL({leverage, entry, exit, quantity})))
    console.log('calcROE: ', calcROE({entry, exit, leverage}).toFixed(2))
    setInitialMargin(formatMoney(calcInitialMargin({entry, quantity, leverage})))
    setPNL(formatMoney(calcPNL({leverage, entry, exit, quantity})))
    setROE(calcROE({entry, exit, leverage}))
  }

  return(
    <>
    <Input label="leverage" childHandleChange={(val) => setLeverage(Number(val))} />
    <Input label="entry $" childHandleChange={(val) => setEntry(Number(val))} />
    <Input label="exit $" childHandleChange={(val) => setExit(Number(val))} />
    <Input label="quantity" childHandleChange={(val) => setQuantity(Number(val))} />
    <Button text="Calculate" onClick={() => calculate({leverage, entry, exit, quantity})} />

    <hr />
    initialMargin: {initialMargin}
    <hr />
    PNL: {PNL}
    <hr />
    ROE: {ROE}
    </>
    

  )

}

export default ProfitNLoss;