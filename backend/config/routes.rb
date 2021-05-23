# frozen_string_literal: true

Rails.application.routes.draw do
  namespace 'api' do
    namespace 'v1' do
      resources :daycares, only: [:show]
      get '/daycares/:id/kids', to: 'daycares#index'
      post '/kids/:id/registerImage', to: 'kids#registerImage'
      resources :kids, only: [:index, :show, :create, :update] do
        get '/notebooks/doesExist', to: 'notebooks#doesExist'
        get '/notebooks/fetchNotebook', to: 'notebooks#fetchNotebook'
        resources :notebooks, only: [:index, :create, :update]
      end
      get '/parents/fetchParentName', to: 'parents#fetchParentName'
      get '/parents/fetchParentArray', to: 'parents#fetchParentArray'
      resources :parents, only: [:create, :update]
      get '/users/fetchUserName', to: 'users#fetchUserName'
      get '/users/fetchUser', to: 'users#fetchUser'
      resources :users, only: [:create, :update]
    end
  end
end
