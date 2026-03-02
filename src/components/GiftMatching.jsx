import GiftMatchCard from './GiftMatchCard'

function GiftMatching({ matchesByVillager }) {
  if (matchesByVillager.length === 0) {
    return (
      <p className="empty-state">
        Pin some villagers first, then add items to your inventory to see gift matches.
      </p>
    )
  }

  return (
    <div>
      {matchesByVillager.map(({ villager, matchedItems }) => (
        <GiftMatchCard
          key={villager.name}
          villager={villager}
          matchedItems={matchedItems}
        />
      ))}
    </div>
  )
}

export default GiftMatching
