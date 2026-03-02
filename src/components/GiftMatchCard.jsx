function GiftMatchCard({ villager, matchedItems }) {
  return (
    <div className="match-section card">
      <p className="match-villager-header">{villager.name}</p>
      <p className="match-villager-meta">
        {villager.species} · {villager.personality}
        {' · '}
        <span>Likes: </span>
        {villager.favorite_styles.map((style, i) => (
          <span key={style} className={`badge badge-${style}`}>{style}</span>
        ))}
      </p>
      <div className="matched-items">
        {matchedItems.length === 0 ? (
          <p className="no-matches">No matching items in your inventory</p>
        ) : (
          matchedItems.map(item => (
            <div key={item.name} className="matched-item">
              <span className={`badge badge-${item.style}`}>{item.style}</span>
              <span>{item.name}</span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default GiftMatchCard
