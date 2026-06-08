const ScoresList = ({ scores }) => {

return ( <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">

  <h2 className="text-2xl font-bold mb-6">
    Latest Scores
  </h2>

  <div className="space-y-4">

    {scores.map((score) => (

      <div
        key={score._id}
        className="bg-slate-800 p-4 rounded-xl flex justify-between"
      >

        <span className="font-semibold">
          Score: {score.score}
        </span>

        <span>
          {new Date(
            score.playedAt
          ).toLocaleDateString()}
        </span>

      </div>

    ))}

  </div>

</div>


);

};

export default ScoresList;
