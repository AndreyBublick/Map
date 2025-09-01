import './shared/styles/App.css'
import { DeviceMap } from './features/device-map'

export const App = () => {
  return (
    <div className='App'>
      <header className={'header'}>
        <h1>Карта устройств</h1>
        <p>Двойной клик по маркеру - центрировать карту. Первое устройство можно перемещать.</p>
      </header>
      <DeviceMap />
    </div>
  )
}
