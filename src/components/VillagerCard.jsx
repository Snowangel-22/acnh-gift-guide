function VillagerCard({ villager, isPinned, onToggle }) {
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
        </div>
        <button
          className={`pin-btn${isPinned ? ' pinned' : ''}`}
          onClick={onToggle}
        >
          {isPinned ? 'Unpin' : 'Pin'}
        </button>
      </div>
    </div>
  )
}

export default VillagerCard
