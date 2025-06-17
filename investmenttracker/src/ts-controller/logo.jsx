import React from 'react';
import logo from '../images/invest_logo.png';


function Logo() {
    return (
        <>
        <header className="App-header">
        <table width="100%" height={100}  style={{border: '1px solid black'}}>
          <tbody>
            <tr>
              <td width="3%"><img src={logo} alt="logo" width={80} height={80}/></td>
              <td align='center' ><h2>Investment Tracker</h2></td>
            </tr>
            </tbody>
          </table>
        
      </header>
        </>
    );
}

export default Logo;