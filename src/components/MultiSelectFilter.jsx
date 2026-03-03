import { useState, useEffect, useRef } from 'react'

function MultiSelectFilter({ label, options, selected, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const toggle = (value) => {
    onChange(selected.includes(value)
      ? selected.filter(v => v !== value)
      : [...selected, value]
    )
  }

  const btnLabel = selected.length === 0
    ? `All ${label}`
    : `${label} (${selected.length})`

  return (
    <div className="multiselect" ref={ref}>
      <button
        className={`multiselect-btn${selected.length > 0 ? ' active' : ''}`}
        onClick={() => setOpen(o => !o)}
        type="button"
      >
        {btnLabel} ▾
      </button>
      {open && (
        <div className="multiselect-dropdown">
          {options.map(opt => (
            <label key={opt} className="multiselect-option">
              <input
                type="checkbox"
                checked={selected.includes(opt)}
                onChange={() => toggle(opt)}
              />
              {opt}
            </label>
          ))}
        </div>
      )}
    </div>
  )
}

export default MultiSelectFilter
