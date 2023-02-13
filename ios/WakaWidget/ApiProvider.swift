//
//  ApiProvider.swift
//  WakatimeStats
//
//  Created by hydromoll on 13.02.2023.
//

import Foundation
let apiKey = "waka_62c1bfee-66d1-440a-8d95-0e1ca4ff9955"
let apiURL = "https://wakatime.com/api/v1/users/current/?api_key=\(apiKey)"
@available(iOS 13.0,*)
class ApiProvider:ObservableObject{
  @Published var todaySeconds:Int = 13064
  @Published var dailyAverageSeconds:Int = 52820
  init(){
//    fetchUser()
  }
  
  
  
  private func fetchUser() -> Void{
    guard let url = URL(string: apiURL) else{return}
    
    let task = URLSession.shared.dataTask(with: url){ data, _, error in
      guard let data = data, error == nil else{
        return
      }
      do{
        let model = try JSONDecoder().decode(WeekStats.self, from: data)
        DispatchQueue.main.async {
          self.todaySeconds = Int(model.data.dailyAverage )
        }
      }
      catch{
        print("Ошибка получения данных пользователя: \(error)")
      }
      
    }.resume()
  }
  
  
  
  
  
}
