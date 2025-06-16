
import React from 'react';

// Props são passadas diretamente
const TeamCard = ({ team }) => {
  return (
    <div className="bg-purple-200/70 p-6 rounded-xl shadow-lg border border-purple-400/60 hover:shadow-xl hover:border-purple-500/80 transition-shadow duration-300 backdrop-blur-sm">
      <h3 className="text-2xl font-bold text-purple-900 mb-3" style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>
        {team.name}
      </h3>
      <ul className="space-y-1.5">
        {team.players.map((player, index) => (
          <li key={index} className={`text-purple-800 ${player === team.leader ? 'font-extrabold text-purple-900' : 'font-medium'}`}>
            <span className={`inline-block w-4 h-4 mr-2 rounded-full align-middle ${player === team.leader ? 'bg-purple-600' : 'bg-purple-500'}`}></span>
            {player}
            {player === team.leader && <span className="ml-2 text-xs font-normal text-purple-700">(Líder)</span>}
          </li>
        ))}
      </ul>
      {team.players.length === 0 && <p className="text-purple-600 italic">Nenhum jogador atribuído.</p>}
    </div>
  );
};

export default TeamCard;
