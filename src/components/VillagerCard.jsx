const COLOR_MAP = {
  Beige:      '#E8D5B0',
  Black:      '#3a3a3a',
  Blue:       '#4169E1',
  Brown:      '#8B5E3C',
  Colorful:   'linear-gradient(135deg, #f00, #ff0, #0f0, #0ff, #00f, #f0f)',
  Gray:       '#909090',
  Green:      '#4CAF50',
  'Light Blue': '#87CEEB',
  Orange:     '#FF8C00',
  Pink:       '#FF69B4',
  Purple:     '#9370DB',
  Red:        '#DC143C',
  White:      '#FFFFFF',
  Yellow:     '#FFD700',
}

function ColorSwatch({ color }) {
  const value = COLOR_MAP[color]
  const isGradient = value?.startsWith('linear-gradient')
  const style = value
    ? (isGradient ? { backgroundImage: value } : { backgroundColor: value })
    : { backgroundColor: '#ccc' }

  return (
    <span className="color-swatch-wrap">
      <span
        className={`color-swatch${color === 'White' ? ' color-swatch-light' : ''}`}
        style={style}
        title={color}
      />
      <span className="color-swatch-label">{color}</span>
    </span>
  )
}

function VillagerCard({ villager, isPinned, onToggle, inventoryItems = [] }) {
  const matchedItems = inventoryItems.filter(item =>
    villager.favorite_styles.includes(item.style)
  )

  return (
    <div className={`card${isPinned ? ' pinned' : ''}`}>
      <div className="card-header">
        <div>
          <p className="card-name">{villager.name}</p>
          <p className="card-meta">
            {villager.species} · {villager.personality} · {villager.birthday}
          </p>
          <div className="badges">
            {villager.favorite_styles.map(style => (
              <span key={style} className={`badge badge-${style}`}>{style}</span>
            ))}
          </div>
          <div className="color-swatches">
            {villager.favorite_colors.map(color => (
              <ColorSwatch key={color} color={color} />
            ))}
          </div>
        </div>
        <button
          className={`pin-btn${isPinned ? ' pinned' : ''}`}
          onClick={onToggle}
        >
          {isPinned ? 'Unpin' : 'Pin'}
        </button>
      </div>

      {matchedItems.length > 0 && (
        <div className="card-matches">
          <p className="card-matches-label">Matched gifts ({matchedItems.length})</p>
          <div className="matched-items">
            {matchedItems.map(item => (
              <div key={item.name} className="matched-item">
                <span className={`badge badge-${item.style.replace(' ', '-')}`}>{item.style}</span>
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default VillagerCard
