# Seattle-Real-Time-Data

[Link](alexngo.io/Seattle-Real-Time-Data)

This is a single page application which displays Seattle 911 Call data in various ways.

## List View
Shows a list of 911 calls ordered by most recent
- infinite scrolling
- shows the event type, and date
- ability to search for specific crimes with list updating in real time

## Graph View
Shows a graph of calls by day of occurance
- graph rerenders on each search
- tooltip for each day giving values for that day

## Map View
Shows a googlemap with markers for each crime
- filters markers while searching and drops them back on the map when they are added back
- custom markers are color coded for each map