class CommentsController < ApplicationController
  before_action :set_feature

  def index
    request = {
      feature: @feature,
      comments: {
        quantity: @feature.comments.all.size,
        comment: @feature.comments.all
      }
    }

    render json: request
  end

  def create
    @comment = @feature.comments.build(content: params[:body])

    if @comment.save
      render json: @comment, status: :created
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  private

  def set_feature
    @feature = Feature.find(params[:id_feature])
  end
end
