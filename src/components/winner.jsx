export function Winner({winner, resetGame}) {
    if (winner === null) {
        return null
    }
    const winnerText= winner === false ? "Empate": `Gana ${winner}`
    return(
          <section className='winner'>
            <div className="text">
              <h2>
                {
                  winnerText
                }
              </h2>
            </div>

            <button onClick={resetGame}>Empezar de nuevo</button>
          </section>)
}