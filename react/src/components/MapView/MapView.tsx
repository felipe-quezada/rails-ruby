import React from 'react';
import './MapView.css';
import 'leaflet/dist/leaflet.css';

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Earthquake } from '../../interfaces/earthquakes';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { LatLngTuple } from 'leaflet';

interface Props {
	marks: Earthquake[];
}

export const MapView: React.FC<Props> = ({ marks }) => {
	const points = marks;
	const center: LatLngTuple =
		marks.length === 0
			? [-20, -60]
			: [
					marks[0].attribute.coordinates.latitude,
					marks[0].attribute.coordinates.longitude,
			  ];

	return (
		<>
			<MapContainer
				center={center}
				zoom={3}
				minZoom={2}
				zoomAnimation
				zoomControl={false}
				scrollWheelZoom
				markerZoomAnimation
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<MarkerClusterGroup chunkedLoading>
					{points.map((mark) => {
						return (
							<Marker
								key={mark.id}
								position={[
									mark.attribute.coordinates.latitude,
									mark.attribute.coordinates.longitude,
								]}
							>
								<Popup>{mark.attribute.title}</Popup>
							</Marker>
						);
					})}
				</MarkerClusterGroup>
			</MapContainer>
		</>
	);
};
