function ClothingItem({ item, isInInventory, onAdd, onRemove }) {
  return (
    <div className="card">
      <div className="card-header">
        <div className="clothing-info">
          <p className="card-name">{item.name}</p>
          <p className="card-meta">
            <span className={`badge badge-${item.style.replace(' ', '-')}`}>{item.style}</span>
            {' · '}{item.source} · {item.buy_price} Bells
          </p>
        </div>
        {isInInventory ? (
          <button className="remove-btn" onClick={onRemove}>Remove</button>
        ) : (
          <button className="add-btn" onClick={onAdd}>Add</button>
        )}
      </div>
    </div>
  )
}

export default ClothingItem
