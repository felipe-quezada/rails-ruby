# frozen_string_literal: true

require 'httparty'

# servicios
class FeatureApiService
  include HTTParty
  base_uri 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary'

  def last_month
    response = self.class.get('/all_month.geojson')
    features = JSON.parse(response.body)['features']

    data = filter_data(features)

    return data if response.success?

    nil
  end

  def last_day
    response = self.class.get('/all_day.geojson')

    features = JSON.parse(response.body)['features']

    data = filter_data(features)

    return data if response.success?

    nil
  end

  private

  def filter_data(data)
    features = []

    data.each do |feature|
      properties = feature['properties']
      new_data = {
        id: feature['id'],
        type: feature['type'],
        magnitude: properties['mag'],
        place: properties['place'],
        time: properties['time'],
        tsunami: properties['tsunami'],
        mag_type: properties['magType'],
        title: properties['title'],
        url: properties['url'],
        longitude: feature['geometry']['coordinates'][0],
        latitude: feature['geometry']['coordinates'][1]
      }
      features << new_data
    end
    features
  end
end
