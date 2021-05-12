# frozen_string_literal: true

Rails.application.routes.draw do
  namespace 'api' do
    namespace 'v1' do
      resources :daycares, only: [:show] do
        get '/communication_notebooks/doesExist', to: 'communication_notebooks#doesExist'
        get '/communication_notebooks/findByDate', to: 'communication_notebooks#findByDate'
        resources :communication_notebooks, only: [:index, :create, :update]
      end
      resources :kids, only: [:index, :create, :update]
      get '/kids/index', to: 'parents#fetchParent'
      get '/parents/fetchParent', to: 'parents#fetchParent'
      resources :parents, only: [:create, :update]
    end
  end
end
