class FeaturesController < ApplicationController
  def index
    page = params[:page].to_i || 1
    per_page = params[:per_page].to_i || 1000
    mag_type = params[:mag_type] || nil

    if per_page > 1000
      render json: { error: 'El parámetro per_page debe ser menor o igual a 1000' }, status: :unprocessable_entity
    else
      # @data = FeatureApiService.new.last_month
      ApplicationJob.perform_later

      data = Feature.where({ mag_type: }.compact).order(time: :desc).limit(per_page).offset((page - 1) * per_page)
      total_count = Feature.where({ mag_type: }.compact).count

      total = (total_count / per_page).ceil

      @response = {
        data: filter_data(data),
        pagination: {
          current_page: page,
          total:,
          per_page:
        }
      }
      render json: @response
    end
  end

  def filter_data(data)
    features = []

    data.each do |feature|
      new_data = {
        id: feature[:id],
        type: 'feature',
        attribute: {
          external_id: feature[:id_feature],
          magnitude: feature[:magnitude],
          place: feature[:place],
          time: feature[:time],
          tsunami: feature[:tsunami],
          mag_type: feature[:mag_type],
          title: feature[:title],
          coordinates: {
            longitude: feature[:longitude],
            latitude: feature[:latitude]
          }
        },
        links: { external_url: feature[:url] }
      }
      features << new_data
    end
    features
  end
end
