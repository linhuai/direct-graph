
class Graph { 
  constructor() { 
    this.adjList = new Map(); 
    for (var i = 0, len = vertices.length; i < len; i++) { 
      this.addVertex(vertices[i]); 
    } 
  } 

  addVertex (key) { 
    this.adjList.set(key, [])
  } 

  addEdge (start, end, distance) {
    this.adjList.get(start).push({
      vertex: end, 
      distance
    })
  } 

  getTrips (start, end, maxStop, equalMaxStop) {
    const result = []
    let directs = this.adjList.get(start)
    factory(directs, this.adjList, [start])

    console.log('getTrips result')
    console.log(result)

    return result

    function factory(directs, adjList, temp) {
      for (let i = 0, len = directs.length; i < len; i++) {
        let vertex = directs[i].vertex
        let temp2 = [].concat(temp, [vertex])
        let tempLen = temp2.length
        if ((vertex === end) && ((equalMaxStop && tempLen === maxStop + 1) || (!equalMaxStop && tempLen <= maxStop + 1))) {
          result.push([].concat(temp2))
        } 
        if (tempLen > maxStop) {
          continue
        }
        factory(adjList.get(vertex), adjList, temp2)
      }
    }
  }
  
  getShortest (start, end) {
    let trips = this.getTrips(start, end, 5)
    let minTrip = trips[0]
    let min = this.getDistance(trips[0].join('-'))
    for(let i = 1, len = trips.length; i < len; i++) {
      if (this.getDistance(trips[i].join('-')) < min) {
        minTrip = trips[i]
      }
    }
    console.log(minTrip.join('-'))
    return minTrip.join('-')
  }

  printGraph () { 
    var keys = this.adjList.keys()
  
    for (var key of keys) { 
      var values = this.adjList.get(key)
      var conc = ''

      for (var value of values) {
        conc += `${value.vertex}${value.distance} `
      }
        
      console.log(`${key}->${conc}`)
    } 
  } 
  
  getDistance (line) {
    let stopArr = line.split('-')
    let startStop = this.adjList.get(stopArr[0])

    let distance = 0

    let currentStop = startStop
    for(let i = 1, len = stopArr.length; i < len; i++) {
      let stop = currentStop.find(item => {
        return item.vertex === stopArr[i]
      })
      if (!stop) {
        distance = 'NO SUCH ROUTE'
        break
      }
      distance += stop.distance
      currentStop = this.adjList.get(stopArr[i])
    }
    console.log(`${line}: distance -> ${distance}`)
    return distance
  }
}


var vertices = [ 'A', 'B', 'C', 'D', 'E' ]; 
var g = new Graph(vertices)
  
// adding edges 
g.addEdge('A', 'B', 5); // AB5
g.addEdge('B', 'C', 4); // BC4
g.addEdge('C', 'D', 8); // CD8
g.addEdge('D', 'C', 8); // DC8
g.addEdge('D', 'E', 6); // DE6
g.addEdge('A', 'D', 5); // AD5
g.addEdge('C', 'E', 2); // CE2
g.addEdge('E', 'B', 3); // AD5
g.addEdge('A', 'E', 7); // AD5
  
g.printGraph(); 

console.log("print distance")
g.getDistance('A-B-C')
g.getDistance('A-D') 
g.getDistance('A-D-C')
g.getDistance('A-E-B-C-D')
g.getDistance('A-E-D')

console.log("get Trips")
g.getTrips('C', 'C', 3)
g.getTrips('A', 'C', 4, true)

console.log("get shortest")
g.getShortest('A', 'C')
g.getShortest('B', 'B')