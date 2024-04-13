import React from 'react';
import './MapView.css';
import 'leaflet/dist/leaflet.css';

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Earthquake } from '../../interfaces/earthquakes';
import MarkerClusterGroup from 'react-leaflet-cluster';

interface Props {
	marks: Earthquake[];
}

export const MapView: React.FC<Props> = ({ marks }) => {
	const points = marks;

	return (
		<>
			<MapContainer
				center={[0, 0]}
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
						console.log(mark.attribute.title);
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
