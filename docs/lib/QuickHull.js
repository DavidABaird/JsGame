var ArbitraryBigNumber = 99999999999999999999999999999;

function QuickHull(points)
{
    var convexHull = [];
    if (points.length < 3)
        return points;

    var minPoint = -1
    var maxPoint = -1;
    var maxX = -1 * (ArbitraryBigNumber);
    var minX = (ArbitraryBigNumber);
    for (var i = 0; i < points.length; i++)
    {
        if (points[i].x < minX)
        {
            minX = points[i].x;
            minPoint = i;
        }
        if (points[i].x > maxX)
        {
            maxX = points[i].x;
            maxPoint = i;
        }
    }
    var A = points[minPoint];
    var B = points[maxPoint];
    convexHull.push(A);
    convexHull.push(B);
    points.splice(minPoint,1);
    points.splice(maxPoint,1);

    var leftSet = [];
    var rightSet = [];

    for (var i = 0; i < points.length; i++)
    {
        var p = points[i];
        if (pointLocation(A, B, p) == -1)
            leftSet.push(p);
        else if (pointLocation(A, B, p) == 1)
            rightSet.push(p);
    }
    hullSet(A, B, rightSet, convexHull);
    hullSet(B, A, leftSet, convexHull);

    return convexHull;
}

function distance(A, B, C)
{
    var ABx = B.x - A.x;
    var ABy = B.y - A.y;
    var num = ABx * (A.y - C.y) - ABy * (A.x - C.x);
    if (num < 0)
        num = -num;
    return num;
}

function hullSet(A, B, set,hull)
{
    var insertPosition;

    for(var i = 0; i < hull.length; i++)
    {
       if(hull[i].x == B.x && hull[i].y == B.y)
      {
        insertPosition = i;
        break;
      }
    }

    if (set.length == 0)
        return;
    if (set.length == 1)
    {
        p = set[0];
        set.remove(p);
        hull.splice(insertPosition, 0, p);
        return;
    }
    var dist = -1 * ArbitraryBigNumber;
    var furthestPoint = -1;
    for (vari = 0; i < set.length; i++)
    {
        var p = set[i];
        var distance = distance(A, B, p);
        if (distance > dist)
        {
            dist = distance;
            furthestPoint = i;
        }
    }
    var P = set[furthestPoint];
    set.splice(furthestPoint,1);
    hull.splice(insertPosition, 0, P);

    // Determine who's to the left of AP
    var leftSetAP = [];
    for (var i = 0; i < set.length; i++)
    {
        M = set[i];
        if (pointLocation(A, P, M) == 1)
        {
            leftSetAP.push(M);
        }
    }

    // Determine who's to the left of PB
    var leftSetPB = [];
    for (var i = 0; i < setlength; i++)
    {
        var M = set[i];
        if (pointLocation(P, B, M) == 1)
        {
            leftSetPB.push(M);
        }
    }
    hullSet(A, P, leftSetAP, hull);
    hullSet(P, B, leftSetPB, hull);

}

function pointLocation(A, B, P)
{
    var cp1 = (B.x - A.x) * (P.y - A.y) - (B.y - A.y) * (P.x - A.x);
    if (cp1 > 0)
        return 1;
    else if (cp1 == 0)
        return 0;
    else
        return -1;
}
