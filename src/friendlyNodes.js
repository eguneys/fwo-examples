import * as u from './fwo/util';
import * as v from './fwo/vector';
import interpolator2 from './fwo/interpolate';

export default function friendlyNodes(radius = 100, n = 100) {

  let ipols = [];

  let nodes = [];

  let maxFriends = 400;

  let iDist = 50;

  let allIndexes = [];

  for (let i = 0; i < n; i++) {
    allIndexes.push(i);

    let angle = u.TAU * (i/n);
    let pos = pointOnCircle(angle, radius);

    let friends = new Set();
    nodes.push({
      friends
    });

    ipols.push(new interpolator2(pos));
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < u.rand(0, maxFriends); j++) {
      let fi = (i + u.randInt(-iDist, iDist) + n) % n;
      if (fi !== i) {
        nodes[i].friends.add(fi),
        nodes[fi].friends.add(i);
      }      
    }

    let friends = nodes[i].friends;
    let nonFriends = allIndexes.slice();

    friends.forEach(_ => 
      nonFriends.splice(nonFriends.indexOf(_), 1));

    nodes[i].nonFriends = nonFriends;
  }

  this.nodes = () => nodes;

  this.update = delta => {

    ipols.forEach(_ => _.update(0.01));
    ipols.forEach((_, i) => {
      let node = nodes[i];
      node.pos = _.value();
    });

    nodes.forEach(distanceToGoal);
  };


  const distanceToGoal = (node, i) => {
    let friendPoss = Array.from(node.friends).map(_ => nodes[_].pos);
    let nonFriendPoss = Array.from(node.nonFriends).map(_ => nodes[_].pos);


    let averageFriend = v.scale(friendPoss.reduce(v.sum2, v.vec2(0, 0)), 1/(friendPoss.length + 1));

    let averageNonFriend = v.scale(nonFriendPoss.reduce(v.sum2, v.vec2(0, 0)), 1/(friendPoss.length + 1));

    let target = v.sum2(v.scale(averageFriend, 2.0),
                        v.scale(averageNonFriend, -0.2));
    
    ipols[i].target(target);

  };
  
}

function pointOnCircle(angle, radius) {
  return v.vec2(Math.cos(angle) * radius,
                Math.sin(angle) * radius);
}
