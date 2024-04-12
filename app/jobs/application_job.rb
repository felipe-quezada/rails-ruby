# frozen_string_literal: true

class ApplicationJob < ActiveJob::Base
  def perform
    @data = FeatureApiService.new.last_month
    delete_old_features
    @new_features = filter_features(@data)

    @new_features.each do |feature|
      save_feature(feature)
    end
  end

  def delete_old_features
    thirty_days = 30 * 24 * 60 * 60
    limit_day = (Time.new.to_i - thirty_days) * 1000

    Feature.where('time < ?', limit_day.to_s).destroy_all
  end

  def filter_features(data)
    data.select do |features|
      magnitude = features[:magnitude]
      latitude = features[:latitude]
      longitude = features[:longitude]

      magnitude >= -1.0 && magnitude <= 10.0 &&
        latitude >= -90.0 && latitude <= 90.0 &&
        longitude >= -180.0 && longitude <= 180.0
    end
  end

  def save_feature(feature)
    return if Feature.exists?(id_feature: feature[:id])

    Feature.create(
      id_feature: feature[:id],
      magnitude: feature[:magnitude],
      place: feature[:place],
      time: feature[:time],
      tsunami: feature[:tsunami],
      mag_type: feature[:mag_type],
      title: feature[:title],
      url: feature[:url],
      longitude: feature[:longitude],
      latitude: feature[:latitude]
    )
  end
end
