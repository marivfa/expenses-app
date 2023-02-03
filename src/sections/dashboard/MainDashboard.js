import { useEffect, useState } from 'react'
import { GetAll } from '../../commons/Api'
import CardList from '../../components/CardList'
import Card from '../../components/Card'
import ColumnPlot from '../../components/ColumnPlot'
import LinePlot from '../../components/LinePlot'
import PiePlot from '../../components/PiePlot'
import { LoadingOverlay } from '@mantine/core'
import '../../style.css'

export default function MainExpenses() {
  const [data, setData] = useState([])
  const [line, setLine] = useState([])
  const [column, setColumn] = useState([])
  const [pie, setPie] = useState([])
  const [remainders, setRemainders] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getResume()
    getLineData()
    getColumnData()
    getPieData()
  }, [])

  const getResume = async () => {
    setIsLoading(true)
    const res = await GetAll(`dashboard/resumen`)
    if (res) {
      setData(res)
    }
    setIsLoading(false)
  }

  const getLineData = async () => {
    setIsLoading(true)
    const res = await GetAll(`dashboard/by_month`)
    if (res) {
      setLine(res)
    }
    setIsLoading(false)
  }

  const getColumnData = async () => {
    setIsLoading(true)
    const res = await GetAll(`dashboard/by_category`)
    if (res) {
      let arrTMP = []
      Object.entries(res).forEach(([key, value]) => {
        let obj = {
          category: key,
          amount: value,
        }
        arrTMP.push(obj)
      })
      setColumn(arrTMP)
    }
    setIsLoading(false)
  }

  const getPieData = async () => {
    setIsLoading(true)
    const res = await GetAll(`dashboard/by_type`)
    if (res) {
      let arrTMP = []
      Object.entries(res).forEach(([key, value]) => {
        let obj = {
          type: key,
          value: value,
        }
        arrTMP.push(obj)
      })
      setPie(arrTMP)
    }
    setIsLoading(false)
  }

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
