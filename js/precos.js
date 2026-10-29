/*
 * precos.js — regras centralizadas de preços e promoções da Retrô 128.
 * Os descontos são configurados em config/app-config.json.
 */
(function (global) {
  'use strict';

  function calcular(jogo, config) {
    const campanhaAtiva = Boolean(config && config.blackFriday && config.blackFriday.ativa);
    const promocoes = campanhaAtiva ? config.blackFriday.promocoes || {} : {};
    const descontoPercentual = Number(promocoes[jogo.id] || 0);
    const desconto = Math.min(100, Math.max(0, descontoPercentual)) / 100;
    const precoOriginal = Number(jogo.preco);
    const precoFinal = Math.round(precoOriginal * (1 - desconto) * 100) / 100;

    return {
      precoOriginal,
      descontoPercentual: Math.round(desconto * 100),
      precoFinal
    };
  }

  global.Precos = Object.freeze({ calcular });
})(window);
