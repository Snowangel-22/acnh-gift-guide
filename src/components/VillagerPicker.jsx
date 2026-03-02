import { useState } from 'react'
import VillagerCard from './VillagerCard'

function VillagerPicker({ villagers, pinnedNames, onTogglePin }) {
  const [search, setSearch] = useState('')

  const filtered = villagers
    .filter(v => v.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const aPinned = pinnedNames.includes(a.name)
      const bPinned = pinnedNames.includes(b.name)
      if (aPinned && !bPinned) return -1
      if (!aPinned && bPinned) return 1
      return 0
    })

  return (
    <div>
      <p className="pin-count">{pinnedNames.length} / 10 villagers pinned</p>
      <input
        className="search-input"
        type="text"
        placeholder="Search villagers..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {villagers.length === 0 ? (
        <p className="empty-state">
          Villager data not loaded yet.<br />
          See setup instructions to populate villagers.json.
        </p>
      ) : filtered.length === 0 ? (
        <p className="empty-state">No villagers match "{search}"</p>
      ) : (
        filtered.map(villager => (
          <VillagerCard
            key={villager.name}
            villager={villager}
            isPinned={pinnedNames.includes(villager.name)}
            onToggle={() => onTogglePin(villager.name)}
          />
        ))
      )}
    </div>
  )
}

export default VillagerPicker
