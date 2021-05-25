# frozen_string_literal: true

Rails.application.routes.draw do
  namespace 'api' do
    namespace 'v1' do
      get 'daycares/:daycare_id/users/:id/user_posts', to: 'posts#user_posts'
      get 'daycares/:daycare_id/users/:id/all_posts', to: 'posts#all_posts'
      post 'daycares/:daycare_id/users/:id/posts', to: 'posts#create'
      get 'daycares/:id/kids', to: 'daycares#index'
      resources :daycares, only: [:show]

      post '/kids/:id/registerImage', to: 'kids#registerImage'
      resources :kids, only: [:index, :show, :create, :update] do
        get '/notebooks/doesExist', to: 'notebooks#doesExist'
        get '/notebooks/fetchNotebook', to: 'notebooks#fetchNotebook'
        resources :notebooks, only: [:index, :create, :update]
      end

      post '/users/:id/registerImage', to: 'users#registerImage'
      get '/users/fetchUserName', to: 'users#fetchUserName'
      get '/users/fetchUser', to: 'users#fetchUser'
      resources :users, only: [:create, :update]
    end
  end
end
