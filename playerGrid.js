function drawPlayerTable(playerGrid, innings, x, y) {
    // Create scrollable container
    if(playerGrid)
        playerGrid.html('');

    //playerGrid.position(x, y);
    playerGrid.style('overflow', 'auto')
    .class('player-panel')
    .mousePressed(() => {
        console.log('clicked on player grid');
        playerGrid.toggleClass('player-panel-expand');
    });
    //playerGrid.position(x, y);
  
    // Create HTML table
    let table = createElement('table')
    .style('border-collapse', 'collapse')
    .style('width', '100%')
    .style('margin', '0')
    .style('min-width', '360px');
  
    // Table header
    let headerRow = createElement('tr');
    headerRow.child(createElement('th', 'Player').style('border', '1px solid #ccc').style('padding', '4px'));
    for (let inning of innings) {
      let th = createElement('th', inning.label);
      th.style('border', '1px solid #ccc');
      th.style('padding', '4px');
      headerRow.child(th);
    }
    table.child(headerRow);
  
    // Get unique player names
    let players = getAllPlayers(innings);
  
    // Fill rows
    for (let player of players) {
      let row = createElement('tr');
      let nameCell = createElement('td', player);
      nameCell.style('border', '1px solid #ccc').style('padding', '4px');
      row.child(nameCell);
  
      for (let inning of innings) {
        let cellText = '';
        for (let pos of inning.positions) {
          if (pos.label < 10 && pos.player && pos.player.name === player) {
            cellText = pos.label;
            break;
          } 
          else if(pos.label > 9 && pos.player && pos.player.name === player) {
            cellText = 'x';
            break;
          }
        }
        let cell = createElement('td', cellText);
        cell.style('border', '1px solid #ccc').style('padding', '4px').style('text-align', 'center');
        row.child(cell);
      }
  
      table.child(row);
    }
  
    playerGrid.child(table);
  }
  
  function getAllPlayers(innings) {
    let playerSet = new Set();
    for (let inning of innings) {
      for (let pos of inning.positions) {
        if (pos.player) {
          playerSet.add(pos.player.name);
        }
      }
    }
    return Array.from(playerSet);
  }