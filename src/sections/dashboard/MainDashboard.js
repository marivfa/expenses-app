import { useContext, useEffect, useState, useCallback } from 'react'
import { GetAll } from '../../commons/Api'
import CardList from '../../components/CardList'
import Card from '../../components/Card'
import ColumnPlot from '../../components/ColumnPlot'
import LinePlot from '../../components/LinePlot'
import PiePlot from '../../components/PiePlot'

import { UsersContext } from '../../context/UsersContext'

import { LoadingOverlay } from '@mantine/core'
import '../../style.css'
export default function MainExpenses() {
  const [data, setData] = useState([])
  const [line, setLine] = useState([])
  const [column, setColumn] = useState([])
  const [pie, setPie] = useState([])
  const [remainders, setRemainders] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const [currentUser] = useContext(UsersContext)

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    try {
      const [resume, line, column, pie] = await Promise.all([
        GetAll(`dashboard/resumen`),
        GetAll(`dashboard/by_month`),
        GetAll(`dashboard/by_category`),
        GetAll(`dashboard/by_type`)
      ])

      if (resume) setData(resume)
      if (line.status) setLine(line.data)
      if (column.status) setColumn(column.data)
      if (pie.status) setPie(pie.data)

    } catch (err) {
      console.error(err)
    }
    setIsLoading(false)
  }, [])


  useEffect(() => {
    fetchData()
  }, [fetchData])

  //const getRemainders = () => {}

  return (
    <div>
      <div className="row">
        <div className="col-xl-4 col-md-6 mb-4">
          <Card
            title={'Expenses Monthly'}
            value={data.expenses_monthly}
            leftColor={'border-left-warning'}
            textColor={'text-warning'}
            currency={currentUser ? currentUser.currency : '$'}
          />
        </div>

        <div className="col-xl-4 col-md-6 mb-4">
          <Card
            title={'Expenses (Monthly) AVG'}
            value={data.avg_monthly}
            leftColor={'border-left-primary'}
            textColor={'text-primary'}
            currency={currentUser ? currentUser.currency : '$'}
          />
        </div>

        <div className="col-xl-4 col-md-6 mb-4">
          <Card
            title={'Expenses (Annual)'}
            value={data.total_annual}
            leftColor={'border-left-success'}
            textColor={'text-success'}
            currency={currentUser ? currentUser.currency : '$'}
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
                <LoadingOverlay
                  visible={isLoading}
                  overlayBlur={2}
                  transitionDuration={500}
                />
                <LinePlot data={line} />
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
              <CardList data={remainders} />
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
                <LoadingOverlay
                  visible={isLoading}
                  overlayBlur={2}
                  transitionDuration={500}
                />
                <ColumnPlot data={column} />
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
                <LoadingOverlay
                  visible={isLoading}
                  overlayBlur={2}
                  transitionDuration={500}
                />
                <PiePlot data={pie} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
