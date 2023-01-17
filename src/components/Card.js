import React from 'react'
import CurrencyFormat from 'react-currency-format'

export default function Card({ title, value, leftColor, textColor }) {
  return (
    <div>
      <div className={`card shadow h-100 py-2 ${leftColor}`}>
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <div
                className={`text-xs font-weight-bold text-uppercase mb-1 ${textColor}`}
              >
                {title}
              </div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">
                <CurrencyFormat
                  value={value}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'$'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
