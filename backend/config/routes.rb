# frozen_string_literal: true

Rails.application.routes.draw do
  namespace 'api' do
    namespace 'v1' do
      get 'daycares/:id/kids/fetch_kids_in_daycare', to: 'kids#fetch_kids_in_daycare'
      get 'daycares/:daycare_id/users/:id/posts/user_posts', to: 'posts#user_posts'
      get 'daycares/:id/posts/all_posts', to: 'posts#all_posts'
      post 'daycares/:daycare_id/users/:id/posts', to: 'posts#create'
      resources :daycares, only: [:show]

      get '/users/:id/kids', to: 'kids#kids_of_parent'
      get '/kids/:id/fetch_posts', to: 'kids#fetch_posts'
      post '/kids/:id/register_image', to: 'kids#register_image'
      resources :kids, only: [:show, :create, :update] do
        get '/notebooks/fetch_notebook', to: 'notebooks#fetch_notebook'
        resources :notebooks, only: [:index, :create, :update]
      end

      post '/users/:id/register_image', to: 'users#register_image'
      get '/users/fetch_user', to: 'users#fetch_user'
      resources :users, only: [:create, :update]
    end
  end
end
