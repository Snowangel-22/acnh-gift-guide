function ClothingItem({ item, isInInventory, onAdd, onRemove }) {
  return (
    <div className="card">
      <div className="card-header">
        <div>
          <p className="card-name">{item.name}</p>
          <p className="card-meta">{item.source} · {item.buy_price} Bells</p>
          <div className="badges">
            <span className={`badge badge-${item.style}`}>{item.style}</span>
          </div>
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
