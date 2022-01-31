import logo from './logo.svg';
import './App.css';
import Button from './components/button';
import Screen from './components/screen';
import { useState } from 'react'

function App() {
  const [toptextInScreen, setTopText] = useState('')
  const [bottomtextInScreen, setBottomText] = useState('')
  const [computedResult, setComputedResult] = useState(false)

  const charArray = [['%', 'C', 'OFF', 'ON'], ['1', '2', '3', '+'], ['4', '5', '6', '-'], ['7', '8', '9', 'X'], ['0', '.', '=', '/']]

  function computeCalculation(arrs, signs, n) {
    if (arrs.length === 1) {return}
  
    if (n === signs.length) { return}
  
    
    if (signs[n] === '%') {
        for (let i = 0; i < arrs.length; i++) {
            if (arrs[i].toString().includes('%')) {
                if (isNaN(arrs[i - 1])) {return}
                else {
                    arrs[i - 1] = +arrs[i - 1] / Math.pow(100, arrs[i].length)
                    arrs.splice(i, 1)
                }
            }
        }
    } else if (signs[n] === '/') {
        for (let i = 0; i < arrs.length; i++) {
            if (arrs[i] === '/') {
                if (isNaN(arrs[i - 1]) || isNaN(arrs[i + 1])) {return}
                else {
                    arrs[i - 1] = + arrs[i - 1] / (+ arrs[i + 1])
                    arrs.splice(i, 2)
                }
            }
        }
    } else if (signs[n] === 'X') {
        for (let i = 0; i < arrs.length; i++) {
            if (arrs[i] === 'X') {
                if (isNaN(arrs[i - 1]) || isNaN(arrs[i + 1])) {return}
                else {
                    arrs[i - 1] = + arrs[i - 1] * (+ arrs[i + 1])
                    arrs.splice(i, 2)
                }
            }
        }
    } else if (signs[n] === '-') {
        for (let i = 0; i < arrs.length; i++) {
            if (arrs[i] === '-') {
                if (isNaN(arrs[i - 1]) || isNaN(arrs[i + 1])) {
                    if (i === 0) {
                        arrs[0] = 0 - (+ arrs[1])
                        arrs.splice(1,1)
                    } else {return}
                }
                else {
                    arrs[i - 1] = + arrs[i - 1] - (+ arrs[i + 1])
                    arrs.splice(i, 2)
                }
            }
        }
    } 
    else if (signs[n] === '+') {
        for (let i = 0; i < arrs.length; i++) {
            if (arrs[i] === '+') {
                if (isNaN(arrs[i - 1]) || isNaN(arrs[i + 1])) {
                    if (i === 0) {
                        arrs[0] = (+ arrs[1])
                        arrs.splice(1,1)
                    } else {return}
                }
                else {
                    arrs[i - 1] = + arrs[i - 1] + (+ arrs[i + 1])
                    arrs.splice(i, 2)
                }
            }
        }
    } 
    console.log(arrs)
    computeCalculation(arrs, signs, n + 1)
    
  }
  
  
  function onbuttonClick(k) {
    

    console.log("You clicked " + k) 
    
  
    let operators = ['+', '-', 'X', '/']
    let numbers = ['1', '2', '3','4', '5', '6', '7', '8', '9','0']
  
    if (computedResult === true && bottomtextInScreen !== 'Syntax Error' && ['+', '-', 'X', '/', '%'].includes(k)) {
      setTopText(bottomtextInScreen)
    }
    
    setTopText(toptextInScreen + k);
   
    if (k === 'OFF') {
      setTopText('')
      setBottomText('')
      setComputedResult(false)
      return;
    }
  
    if (k === 'ON') {
      setTopText('')
      setBottomText('0')
      setComputedResult(false)
      return;
    }
  
    if (k === 'C') {
      setTopText('')
      setBottomText('0')
      setComputedResult(false)
      return;
    }
  
    if (k === '=') {
      console.log(toptextInScreen)
      if (['%', 'X', '/'].includes(toptextInScreen[0])) {
        setBottomText('Syntax Error')
        return
      }
  
      if (['X', '/', '+', '-', '.'].includes(toptextInScreen[-1])) {
        setBottomText('Syntax Error')
        return
      }
  
      let arr = []
      let strOfnum = ''
      for (let i =0; i < toptextInScreen.length; i++) {
        if (toptextInScreen[i] === '%') {
          if (toptextInScreen[i - 1] !== '%' && (!(numbers.includes(toptextInScreen[i-1])) || (numbers.includes(toptextInScreen[i+1])))) {
            setBottomText('Syntax Error')
          return
        } else {
          if (numbers.includes(toptextInScreen[i-1])) {
            
            strOfnum !== '' ? arr.push(strOfnum) : strOfnum = toptextInScreen[i]
            strOfnum = toptextInScreen[i]
          } else {
            strOfnum = strOfnum + toptextInScreen[i]
          }
        }
      }
  
        if (numbers.includes(toptextInScreen[i])) {
          if (!(numbers.includes(toptextInScreen[i-1])) && toptextInScreen[i-1] !== '.') {
            
            strOfnum !== '' ? arr.push(strOfnum) : strOfnum = toptextInScreen[i]
            strOfnum = toptextInScreen[i]
          } else {
            strOfnum = strOfnum + toptextInScreen[i]
          }
        }
        
  
        if (operators.includes(toptextInScreen[i])) {
          if (operators.includes(toptextInScreen[i - 1])) {
            setBottomText('Syntax Error')
            return
          } else {
            
            strOfnum !== '' ? arr.push(strOfnum) : strOfnum = toptextInScreen[i]
            strOfnum = toptextInScreen[i]
          }
        }
  
        if (toptextInScreen[i] === '.') {
          if (toptextInScreen[i-1] === '.') {
            setBottomText('Syntax Error')
            return
          }
         else {
          if (numbers.includes(toptextInScreen[i-1])) {
            strOfnum = strOfnum + toptextInScreen[i]
          } else {
            
            strOfnum !== '' ? arr.push(strOfnum) : strOfnum = toptextInScreen[i]
            strOfnum = toptextInScreen[i]
          }
        }
        
      }
  
    } arr.push(strOfnum)
  
      console.log("After Loop: " )
      console.log(arr)
  
      computeCalculation(arr, ['%', '/', 'X', '-', '+'], 0)
  
      console.log(arr);
      arr.length > 1 ? setBottomText('Syntax Error') : setBottomText(arr[0].toString());
  
  
      setComputedResult(true)
    }
    
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <div className= "container">
          <Screen toptextInScreen = {toptextInScreen} bottomtextInScreen= {bottomtextInScreen}/>
          {charArray.map((charList) => (
            <div className = "horizontal-buttons">
              {charList.map((text) => (
                <Button buttonText = {text} onClick = {onbuttonClick}/>
              ))}

            </div>
          ))}
        </div>
        
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}




  

export default App;



