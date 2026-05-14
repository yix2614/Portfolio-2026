import Clock from './components/Clock'

export default function NikeShoeFinder() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--color-bg-page)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Clock size={420} />
    </div>
  )
}
