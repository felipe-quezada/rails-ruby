Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  scope '/api' do
    get 'features', to: 'features#index'
    get 'features/:id_feature/comments', to: 'comments#index'
    post 'features/:id_feature/comments', to: 'comments#create'
  end

  if ENV["RAILS_SERVE_STATIC_FILES"].present?
    get "/", to: static("index.html")
    post "/", to: static("index.html")
  end
  # Defines the root path route ("/")
  # root "posts#index"
end
