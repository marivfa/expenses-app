import React, { useEffect, useState } from 'react'
import { GetAll } from '../../commons/Api'
import CardList from '../../components/CardList'
import Card from '../../components/Card'
import ColumnPlot from '../../components/ColumnPlot'
import LinePlot from '../../components/LinePlot'
import PiePlot from '../../components/PiePlot'
import '../../style.css'

export default function MainExpenses() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getResumen()
  }, [])

  const getResumen = () => {
    setIsLoading(true)
    GetAll(`dashboard/resumen`).then(
      res => {
        setData(res)
        setIsLoading(false)
      },
      error => {
        setIsLoading(false)
      }
    )
  }

  const getRemainders = () => {
    setIsLoading(true)
    GetAll(`dashboard/resumen`).then(
      res => {
        setData(res)
        setIsLoading(false)
      },
      error => {
        setIsLoading(false)
      }
    )
  }

  return (
    <div>
      <div className="row">
        <div className="col-xl-4 col-md-6 mb-4">
          <Card
            title={'Expenses Monthly'}
            value={data.expenses_monthly}
            leftColor={'border-left-warning'}
            textColor={'text-warning'}
          />
        </div>

        <div className="col-xl-4 col-md-6 mb-4">
          <Card
            title={'Expenses (Monthly) AVG'}
            value={data.avg_monthly}
            leftColor={'border-left-primary'}
            textColor={'text-primary'}
          />
        </div>

        <div className="col-xl-4 col-md-6 mb-4">
          <Card
            title={'Expenses (Annual)'}
            value={data.total_annual}
            leftColor={'border-left-success'}
            textColor={'text-success'}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-xl-8 col-lg-7">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">
                Expenses Monthly
              </h6>
            </div>
            <div className="card-body">
              <div className="chart-area">
                <LinePlot />
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-4 col-lg-7">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">Remainders</h6>
            </div>
            <div className="card-body">
              <div
                className="btn-group btn-group-sm"
                role="group"
                aria-label="Busqueda"
              >
                <button type="button" className="btn btn-light">
                  Day
                </button>
                <button type="button" className="btn btn-light">
                  Week
                </button>
                <button type="button" className="btn btn-light">
                  Month
                </button>
              </div>
              <hr></hr>
              <CardList />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-6 col-lg-7">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">
                Expenses by Category
              </h6>
            </div>
            <div className="card-body">
              <div className="chart-area">
                <ColumnPlot />
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-6 col-lg-7">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">
                Expenses by Type
              </h6>
            </div>
            <div className="card-body">
              <div className="chart-area">
                <PiePlot />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
