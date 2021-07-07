# frozen_string_literal: true

Rails.application.routes.draw do
  namespace 'api' do
    namespace 'v1' do
      get 'daycares/:id/kids', to: 'kids#kids_in_daycare'
      get 'daycares/:id/posts', to: 'posts#all_posts'
      get 'daycares/:daycare_id/users/:id/posts', to: 'posts#user_posts'
      post 'daycares/:daycare_id/users/:id/posts', to: 'posts#create'
      resources :daycares, only: [:show]

      get '/users/:id/kids', to: 'kids#kids_of_parent'
      post '/kids/:id/register_image', to: 'kids#register_image'
      resources :kids, only: %i[show create update] do
        get '/notebooks/fetch_notebook', to: 'notebooks#fetch_notebook'
        resources :notebooks, only: %i[create update]
        resources :notebook_templates, only: %i[show index create]
      end

      post '/users/:id/register_image', to: 'users#register_image'
      get '/users/fetch_user', to: 'users#fetch_user'
      resources :users, only: %i[create update]
      get :health_check, to: 'health_check#index'
    end
  end
end
